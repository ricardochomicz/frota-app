import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "../../helpers/Helpers";
import moment from "moment";

const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.text("Relatório de Análise de Custos", 14, 10);

    autoTable(doc, {
        startY: 20,
        head: [["#", "Data", "Marca/Cód", "Data Compra/Valor", "Km Recomendada", "Km Rodados", "Performance", "Custo/KM"]],
        body: analysis.map(analysi => [
            analysi.id,
            formatDate(analysi.created_at),
            `${analysi.brand} / ${analysi.code}`,
            `${moment(analysi.purchase_date).format("DD/MM/YYYY")} - R$ ${analysi.price}`,
            `${analysi.durability_km} Km`,
            `${analysi.mileage_driven} Km`,
            analysi.performance_score,
            `R$ ${analysi.cost}`
        ]),
    });

    doc.save("Relatorio_Analise_Custos.pdf");
};

export default generatePDF


