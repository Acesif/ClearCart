## ClearCart Documentation

### Approach I took to design and build ClearCart

#### Core Technologies and Frameworks

---

##### Backend
- **Spring Boot 3.5.4**
- **Spring WebFlux**:
- **Spring Data JPA**
- **PostgreSQL**
- **Spring Security**
- **GraphQL**
- **Gradle**

---

##### Frontend
- **React**
- **TailwindCSS**
- **Shadcn**
- **React Router**
- **Zustand**
- **Apollo Client**

---

#### Architectural Design

The backend follows a classic three-tier architecture, consisting of a presentation layer, a business logic layer, and a data access layer.

- **Base Layer**
  - `BaseEntity`: Provides common fields like `id`, `createDate`, `updateDate`, and a `flag` for soft deletes.
  - `BaseRepository`: Extends `JpaRepository` and includes a custom method for soft deletes.
  - `BaseService`: Provides common CRUD operations, reducing boilerplate code in the service layer.

- **Configuration Layer**
  - `SecurityConfig`: Configures Spring Security to use JWT for authentication, and enables CORS.
  - `JwtReactiveAuthenticationManager`: Validates JWT tokens.
  - `BearerTokenServerAuthenticationConverter`: Extracts JWT tokens from the `Authorization` header.
  - `CorsConfig`: Configures CORS to allow requests from the frontend application.

- **Presentation Layer**
  - `AuthController`: Handles user authentication and profile management.
  - `ProductController`: Manages product-related operations.
  - `TransactionController`: Handles buying and renting products.
  - Method-level security is enforced using `@PreAuthorize` annotations.

- **Business Logic Layer**
  - `UserService`: Manages user creation, login, and profile updates.
  - `ProductService`: Handles the logic for creating, updating, deleting, and fetching products.
  - `TransactionService`: Manages the business logic for buying and renting products, using `@Transactional` to ensure data consistency.
  - `JwtService`: A dedicated service for creating and parsing JWTs.

- **Data Access Layer**:
  - **Entities**: Define the database schema with classes like `User`, `Role`, `Product`, `ProductCategory`, and `ProductTransactions`.
  - **Repositories**: Spring Data JPA repositories provide an abstraction layer for database operations.

- **Utilities**: This package contains utility classes, including a `DBSeeder` that populates the database with initial data on startup, which is useful for development and testing.

---

#### Database Schema

The database schema is designed to be simple and efficient, with clear relationships between entities.
- **`users`**: Stores user information, including personal details and hashed passwords.
- **`roles`**: Stores user roles (e.g., `ROLE_USER`, `ROLE_ADMIN`).
- **`products`**: Stores product information, including title, description, price, and owner.
- **`category`**: Stores product categories.
- **`product_transactions`**: Records all transactions, including buy/sell/rent and borrow.

---
### Inside the Mind of the Backend Design

#### Base 
To prevent duplicate code, I created `BaseService`, `BaseEntity` and `BaseRepository` which would have a common repetitive logic inherited by all child classes.
For example: created_at, updated_at, id fields are common in all entities, so they are inherited from `BaseEntity`, similarly `findById`, `delete`, `save` etc. are common for all repositories, so they are inherited from `BaseRepositoy`

#### Security
I have followed the traditional signup/login flow where the user signs up with their information and the email and encoded password gets saved in the `users` table.
Later, during login, the encoded password of that user is matched with the provided password and a JWT token is returned which is saved on the browser's localStorage for further authenticated requests.

I have created a controller that allows the user to update their information and password as well.

### Product
For the Product business logic, I have created the `category` and `products` table, I did not use an enum for category initially with a plan to allow addition or removal of categories.
The information about products are stored in the `products` table. It contains the necessary data, and an enum `RateInterval` to define the interval for rent rate such as 'PER HOUR', 'PER WEEK' etc.
I have created a relationship with the User table as well using the `owner` column and there is a draft flag with is used for sequential creation of the product.

Since product is to be created in the sequence title -> description -> categories etc.  
So to handle that, I kept a draft flag, that will initially be false and when the user clicks submit, it will be set to true.
Draft products are not shown to the users when they visit the site to buy/rent products.

Now you might wonder why is there `addProduct` query in the graphql schema. So what it does is it creates a skeleton product with just the id and returns it.
The frontend stored the product_id its context and then uses it to sequentially go through the product creation wizard.

The categories are dynamically fetched from the Backend, so if any changes are made to the category list, it will be visible in the frontend.

### Transactions
To keep records of the transactions taking place, I created a `product_transactions` table that would keep record of what product has been bought/sold/lent/borrowed.
I kept track of the `transaction_type` as well as the ownership transfer through `to_owner` and `from_owner`. I also kept a `to_rent_date` and `from_rent_date` which be null for buying/selling and be populated with selected dates when renting.

To address the requirement, I have created a `validRentPeriod` helper method that returns an error message if someone tried to rent when another user has already rented at that timeframe.
When a product gets bought, its `to_owner` is set from the user information extracted from the token sent from the frontend and the `from_owner` is the original owner in the `products` table.

When an item is bought, its flag is set to false and it no longer shows up in ClearCart. But rented items are still available for other users to rent at a different time.

### GraphQL
I kept the queries modular by first created a base `graphqls` file and then extended the queries and mutations in `auth`, `product` and `transaction` graphqls files.
This helped me stay modular and clean.

### How I crafted the Frontend

I kept the architecture modular by creating the `components` folder for keeping the components to be used in the pages and for reusable components.
The `ui` folder contains the components from `Shadcn` and the components have been modularized based on their business logic. The `commons` folder is for components common to both or doesn't fit either of them.
The `graphql` folder contains the queries and mutations which are separated by type and business logic.
The `lib` folder contains the `token` utility for saving the session and retrieving token/user information when making requests to the backend.
The `store` folder is for the zustand, only `product_id` needed to be stored, hence one file.
The `types` folder contains the reusable types that have been used to define props and response data types across many pages.
The `pages` folder is where the actual pages have been constructed using the components from the `components` folder. I kept all the API calls in the page component of the respective pages and passed down the respective values to the components that need it.

The `Routes` component is used route the user to different pages depending on the request while some routes have been wrapped with `ProtectedRoute` to only allow authenticated users to visit, otherwise redirect them to login page.
