import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { authMapper } from "./auth.mapper";
import { siteMapper } from "./site.mapper";
import { userMapper } from "./user.mapper";
import { projectMapper } from "./project.mapper";
import { unitMapper } from "./unit.mapper";
import { productMapper } from "./product.mapper";
import { companyMapper } from "./company.mapper";
import { productRequisitionFormMapper } from "./product-requisition-form.mapper";
import { approvalLogMapper } from "./approval-log.mapper";
import { userApprovalMapper } from "./user-approval.mapper";
import { requestProductMapper } from "./request-product.mapper";
import { roleMapper } from "./role.mapper";
import { authorityMapper } from "./authority.mapper";
import { permissionMapper } from "./permission.mapper";
import { userRoleMapper } from "./user-role.mapper";
import { departmentMapper } from "./department.mapper";
import { userDepartmentMapper } from "./user-department.mapper";
import { assignedUserApprovalMapper } from "./assigned-user-approval.mapper";
import { warehouseMapper } from "./warehouse.mapper";
import { productWarehouseMapper } from "./product-warehouse.mapper";
import { temporaryProductMapper } from "./temporary-product.mapper"

export const mapper = createMapper({
  strategyInitializer: classes(),
});

authMapper(mapper);
siteMapper(mapper);
userMapper(mapper);
projectMapper(mapper);
unitMapper(mapper);
productMapper(mapper);
companyMapper(mapper);
productRequisitionFormMapper(mapper);
approvalLogMapper(mapper);
userApprovalMapper(mapper);
requestProductMapper(mapper);
roleMapper(mapper);
authorityMapper(mapper);
permissionMapper(mapper);
userRoleMapper(mapper);
departmentMapper(mapper);
userDepartmentMapper(mapper);
assignedUserApprovalMapper(mapper);
warehouseMapper(mapper);
productWarehouseMapper(mapper);
temporaryProductMapper(mapper);
