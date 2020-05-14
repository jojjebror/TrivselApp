import { EntityState } from "@ngrx/entity";
import { Office } from "src/app/shared/models/dto/OfficeDto";

export interface OfficesState extends EntityState<Office> {
    selectedOfficeId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}