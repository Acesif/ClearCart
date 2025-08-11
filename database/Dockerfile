FROM postgres:17

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=mysecretpassword

COPY init.sql /docker-entrypoint-initdb.d/
