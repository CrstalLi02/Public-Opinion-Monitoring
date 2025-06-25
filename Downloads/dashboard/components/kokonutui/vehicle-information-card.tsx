"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Car, CalendarDays, Wrench, Tag, ShieldCheck, FileText } from "lucide-react"

interface VehicleInformationProps {
  vehicleData?: {
    licensePlate?: string
    vin?: string
    model?: string
    series?: string
    brand?: string
    color?: string
    productionDate?: string
    saleDate?: string
    engineModel?: string
    transmissionModel?: string
    mileage?: number
    warrantyStatus?: string
    lastMaintenanceDate?: string
    ownerName?: string
    ownerPhone?: string
    insuranceExpiry?: string
  }
}

const DetailItem: React.FC<{ label: string; value?: string | number; icon?: React.ReactNode }> = ({
  label,
  value,
  icon,
}) => (
  <div className="flex items-start py-2">
    {icon && <div className="mr-3 mt-1 text-gray-500">{icon}</div>}
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-md text-gray-800">{value || "N/A"}</p>
    </div>
  </div>
)

export function VehicleInformationCard({ vehicleData }: VehicleInformationProps) {
  const data = vehicleData || {
    // Sample data if none provided
    licensePlate: "粤B88888",
    vin: "LSVDU2A57P02XXXXX",
    model: "Model Y 高性能版",
    series: "Model Y",
    brand: "特斯拉",
    color: "珍珠白",
    productionDate: "2023-03-15",
    saleDate: "2023-04-01",
    engineModel: "N/A (电动)",
    transmissionModel: "N/A (电动)",
    mileage: 12500,
    warrantyStatus: "保修期内",
    lastMaintenanceDate: "2024-01-10",
    ownerName: "李明",
    ownerPhone: "138****8888",
    insuranceExpiry: "2025-03-31",
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-gray-700 flex items-center">
          <Car className="mr-2 h-6 w-6 text-primary" />
          车辆详细信息 (Vehicle Details)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
          <DetailItem label="车牌号码 (License Plate)" value={data.licensePlate} icon={<FileText size={18} />} />
          <DetailItem label="VIN码 (Vehicle Identification Number)" value={data.vin} icon={<Tag size={18} />} />
          <DetailItem label="车辆型号 (Model)" value={data.model} icon={<Car size={18} />} />
          <DetailItem label="车系 (Series)" value={data.series} icon={<Car size={18} />} />
          <DetailItem label="品牌 (Brand)" value={data.brand} icon={<Car size={18} />} />
          <DetailItem label="颜色 (Color)" value={data.color} icon={<Tag size={18} />} />
          <DetailItem
            label="生产日期 (Production Date)"
            value={data.productionDate}
            icon={<CalendarDays size={18} />}
          />
          <DetailItem label="销售日期 (Sale Date)" value={data.saleDate} icon={<CalendarDays size={18} />} />
          <DetailItem label="发动机型号 (Engine Model)" value={data.engineModel} icon={<Wrench size={18} />} />
          <DetailItem
            label="变速箱型号 (Transmission Model)"
            value={data.transmissionModel}
            icon={<Wrench size={18} />}
          />
          <DetailItem label="当前里程 (Mileage)" value={`${data.mileage} km`} icon={<FileText size={18} />} />
          <DetailItem label="保修状态 (Warranty Status)" value={data.warrantyStatus} icon={<ShieldCheck size={18} />} />
          <DetailItem
            label="上次保养日期 (Last Maintenance)"
            value={data.lastMaintenanceDate}
            icon={<CalendarDays size={18} />}
          />
          <DetailItem label="车主姓名 (Owner Name)" value={data.ownerName} icon={<FileText size={18} />} />
          <DetailItem label="车主电话 (Owner Phone)" value={data.ownerPhone} icon={<FileText size={18} />} />
          <DetailItem
            label="保险到期日 (Insurance Expiry)"
            value={data.insuranceExpiry}
            icon={<ShieldCheck size={18} />}
          />
        </div>
        {vehicleData &&
          Object.keys(vehicleData).length > 15 && ( // Example for additional custom fields
            <>
              <Separator className="my-4" />
              <h4 className="text-md font-semibold text-gray-600 mb-2">其他信息 (Additional Information)</h4>
              {/* Render other dynamic fields here if necessary */}
            </>
          )}
      </CardContent>
    </Card>
  )
}
