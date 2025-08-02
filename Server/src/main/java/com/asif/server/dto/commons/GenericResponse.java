package com.asif.server.dto.commons;

import lombok.*;

@Getter
@Setter
@Builder
@EqualsAndHashCode
@AllArgsConstructor
public class GenericResponse<T> {
//    todo:
//    private StatusCodes status;
    private String message;
    private T data;
}
