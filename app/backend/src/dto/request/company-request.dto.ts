import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";

export class CreateCompanyRequestDto {
  @IsNotEmpty({ message: "INVALID_COMPANY_NAME" })
  @Expose()
  @AutoMap()
  name?: string;
}
