import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import { formatDate } from "../helpers/Helpers";
import { ICostAnalysis } from "../interfaces/CostAnalysisInterface";

class ExportPDFService {

    static generateCostAnalysisPDF = (analysis: ICostAnalysis[], month: string) => {
        const doc = new jsPDF('l', 'mm', 'a4');

        doc.setFontSize(12);
        doc.text("Relatório de Análises de Custos", 14, 10);

        // Preparar os dados para a tabela
        const tableData = analysis.map(analysi => [
            formatDate(analysi.created_at),
            `${analysi.brand_vehicle}`,
            `${analysi.license_plate}`,
            `${analysi.brand}`,
            `${analysi.code}`,
            `${moment(analysi.purchase_date).format("DD/MM/YYYY")}`,
            `R$ ${analysi.price}`,
            `${analysi.durability_km} Km`,
            `${analysi.mileage_driven} Km`,
            analysi.performance_score,
            `R$ ${analysi.cost}`
        ]);

        // Gerar a tabela no PDF
        autoTable(doc, {
            startY: 30,
            head: [[
                "Data", "Veiculo", "Placa", "Marca Pneu", "Cod Pneu", "Data Compra", "Valor", "Km Recomendada",
                "Km Rodados", "Performance", "Custo/KM"
            ],],
            body: tableData,
        });

        const fileName = month ? `Relatorio_Analise_Custos_${month}.pdf` : "Relatorio_Analise_Custos.pdf";
        doc.save(fileName);
    };
}

export default ExportPDFService;
