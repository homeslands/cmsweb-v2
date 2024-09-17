import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "@entities/base.entity";
import { Unit } from "@entities/unit.entity";
import { RequestProduct } from "@entities/request-product.entity";
import { ProductStatus } from "@enums";
import { AutoMap } from "@automapper/classes";

@Entity("product_tbl")
export class Product extends Base {
  @Column({ name: "name_column" })
  @AutoMap()
  name?: string;

  @Column({ name: "code_column", nullable: true })
  @AutoMap()
  code?: string;

  @Column({ name: "provider_column" })
  @AutoMap()
  provider?: string;

  @Column({ name: "rfid_column", nullable: true })
  rfid?: string;

  @Column({ name: "inventory_column", nullable: true })
  inventory?: string;

  @Column({ name: "status_column", nullable: true })
  @AutoMap()
  status?: ProductStatus;

  @Column({ name: "description_column", nullable: true })
  @AutoMap()
  description?: string;

  @ManyToOne(() => Unit, (unit) => unit.products)
  @JoinColumn({ name: "unit_id_column" })
  unit?: Unit;

  // a product have many request product
  @OneToMany(() => RequestProduct,
    (requestProduct) => requestProduct.product)
  requestProducts?: RequestProduct[];
}
