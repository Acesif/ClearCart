import Select from "react-select";
import {CategoryTypeMapping} from "@/types/CategoryTypeMapping.ts";
import type {createProductFormProps} from "@/types/createProductFormProps.ts";
import {type RateInterval, RateIntervals} from "@/types/RateInterval.ts";

const ProductEditCard = ({
    title,
    description,
    setTitle,
    setDescription,
    selectedCategories,
    setSelectedCategories,
    categories,
    price,
    setPrice,
    rentAmount,
    setRentAmount,
    rentOption,
    setRentOption
} : createProductFormProps) => {

    const formattedCategories = categories.map(category => ({
        value: category,
        label: CategoryTypeMapping[category]
    }));

    return (
        <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Edit Product</h2>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Edit your title"
                />
            </div>

            <Select
                isMulti
                value={formattedCategories.filter(option => selectedCategories.includes(option.value))}
                onChange={selectedOptions => setSelectedCategories(selectedOptions ? selectedOptions.map(option => option.value) : [])}
                options={formattedCategories}
                closeMenuOnSelect={false}
                placeholder="Edit categories"
                className="w-full"
                classNamePrefix="react-select"
            />

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 w-full h-50 block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Edit your description"
                ></textarea>
            </div>

            <div className="mb-4 flex justify-between">
                <div className="w-1/2 mr-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => {setPrice(Number(e.target.value))}}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Edit your price"
                    />
                </div>

                <div className="w-1/2 ml-2 flex gap-2">

                    <label htmlFor="rent" className="block text-sm font-medium text-gray-700">
                        <span>Rent Amount</span>
                        <input
                            type="text"
                            id="rent"
                            value={rentAmount}
                            onChange={(e) => {setRentAmount(Number(e.target.value))}}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Edit your rent"
                        />
                    </label>
                    <label className="block text-gray-800">
                        <span>Select option</span>
                        <select
                            value={rentOption}
                            onChange={(e) => setRentOption(e.target.value as RateInterval)}
                            className="w-full py-1.5 text-lg text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        >
                            <option value="" disabled={true}>Select option</option>
                            {Object.values(RateIntervals).map((interval) => (
                                <option key={interval} value={interval}>
                                    {interval.replace('_', ' ').toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                Edit Product
            </button>
        </div>
    );
};

export default ProductEditCard;
