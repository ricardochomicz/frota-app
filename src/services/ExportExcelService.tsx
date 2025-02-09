import * as XLSX from "xlsx";
import { ICostAnalysis } from "../interfaces/CostAnalysisInterface";
import moment from "moment";
import { formatDate } from "../helpers/Helpers";

class ExportExcelService {
    static generateCostAnalysisExcel(analysis: ICostAnalysis[], month: string) {
        // Se 'month' não estiver vazio, filtra as análises para o mês selecionado
        const filteredAnalysis = month
            ? analysis.filter(analysi => moment(analysi.created_at).isSame(month, 'month'))
            : analysis; // Se não houver mês, inclui todas as análises

        const wsData = [
            [
                "Data", "Veiculo", "Placa", "Marca Pneu", "Cod Pneu", "Data Compra", "Valor", "Km Recomendada",
                "Km Rodados", "Performance", "Custo/KM"
            ],
            ...filteredAnalysis.map(analysi => [
                formatDate(analysi.created_at),
                `${analysi.brand_vehicle}`,
                `${analysi.license_plate}`,
                `${analysi.brand}`,
                `${analysi.code}`,
                `${moment(analysi.purchase_date).format("DD/MM/YYYY")}`,
                `${analysi.price}`,
                `${analysi.durability_km} Km`,
                `${analysi.mileage_driven} Km`,
                analysi.performance_score,
                `R$ ${analysi.cost}`
            ]),
        ];

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Análise de Custos");

        // Gerar o arquivo Excel
        XLSX.writeFile(wb, "Relatorio_Analise_Custos.xlsx");
    }
}

export default ExportExcelService;
