import { PaginationDto } from "src/common/dto/pagination.dto";

export class FindNotificationDto extends PaginationDto {
    userId: number;
}