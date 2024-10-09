import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";

export class CreatePermissionRequestDto {
  // @IsNotEmpty({message: "INVALID_PRODUCT_NAME"})
  @Expose()
  @AutoMap()
  roleSlug?: string;

  // @IsNotEmpty({ message: "INVALID_PRODUCT_UNIT" })
  @Expose()
  @AutoMap()
  authoritySlug?: string;
}
