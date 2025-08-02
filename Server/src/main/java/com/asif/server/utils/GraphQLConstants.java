package com.asif.server.utils;

public class GraphQLConstants {
    public static final String UNAUTHORIZED_RESPONSE = """
            {
              "errors": [
                {
                  "message": "Unauthorized",
                  "extensions": {
                    "code": "UNAUTHORIZED"
                  }
                }
              ]
            }
            """;
}
