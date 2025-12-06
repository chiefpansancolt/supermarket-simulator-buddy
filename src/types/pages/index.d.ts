import type { Playthrough } from "@/types";

export interface HiringTabProps {
	activePlaythrough: Playthrough;
	onHireEmployee: (employeeId: string) => void;
	onFireEmployee: (employeeId: string) => void;
}

export interface GrowthTabProps {
	activePlaythrough: Playthrough;
	onUnlockGrowth: (sectionNum: string) => void;
	onLockGrowth: (sectionNum: string) => void;
}

export interface LicensesTabProps {
	activePlaythrough: Playthrough;
	onUnlockLicense: (licenseId: string) => void;
	onLockLicense: (licenseId: string) => void;
}

export interface StorageTabProps {
	activePlaythrough: Playthrough;
	onUnlockStorage: (sectionNum: string) => void;
	onLockStorage: (sectionNum: string) => void;
}

export interface ProductsTabProps {
	activePlaythrough: Playthrough;
}

export interface ToolsTabProps {
	activePlaythrough: Playthrough;
	onUnlockTool: (toolName: string) => void;
}

export interface VehiclesTabProps {
	activePlaythrough: Playthrough;
	onUnlockVehicle: (vehicleName: string) => void;
}

export interface PendingItem {
	id: string;
	productName: string;
	company?: string;
	boxes: number;
	store: string;
}
