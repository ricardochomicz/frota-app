import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ToastService } from "../../services/common/ToastService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBroom, faFilter } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "../../services/auth/AuthService";
import { ICostAnalysis } from "../../interfaces/CostAnalysisInterface";
import CostAnalysisService from "../../services/CostAnalysisService";
import moment from "moment";
import { formatDate } from "../../helpers/Helpers";

const CostAnalysisIndex = () => {

    const [analysis, setAnalysis] = useState<ICostAnalysis[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({ replacement_reason: "" });
    const limit = 5

    const fetchAnalysis = async () => {
        try {
            const authUser = AuthService.getUser().id;
            const response = await CostAnalysisService.getAll(page, limit, filters);
            setAnalysis(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error)
            setError("Erro ao carregar os análises");
            ToastService.error("Erro ao carregar os análises.");
        } finally {
            setLoading(false);
        }

    };
    useEffect(() => {
        fetchAnalysis();
    }, [page, filters]);

    const handleDelete = async (analysisId) => {
        try {
            await CostAnalysisService.destroy(analysisId)
            ToastService.success("Análise excluída com sucesso!");
            await fetchAnalysis()
        } catch (error) {
            ToastService.error(error.response.data.details)
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({ replacement_reason: "" });
        setPage(1);
    };


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
            <div className="flex justify-between items-center mb-4">

                <div className="flex gap-3 ml-auto">
                    <FontAwesomeIcon icon={faFilter} className="tooltips text-gray-500 mt-4" size="lg" />
                    <select name="replacement_reason" value={filters.replacement_reason} onChange={handleFilterChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" selected>Selecione</option>
                        <option value="defect">Defeito</option>
                        <option value="reform">Recapagem</option>
                        <option value="replace">Substituido</option>
                        <option value="repair">Reparo</option>
                    </select>

                    <button onClick={clearFilters} type="submit" className="tooltips p-2.5 ms-1 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <FontAwesomeIcon icon={faBroom} className="text-white" size="lg" />
                    </button>
                </div>
            </div>

            {
                loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Ops!</span> {error}
                    </div>
                ) : (
                    <div className="sm:rounded-lg w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                Lista de Análises

                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-1 py-3 text-center">#</th>
                                    <th scope="col" className="px-6 py-3 text-center">Data</th>
                                    <th scope="col" className="px-6 py-3 text-center">Marca/Cód</th>
                                    <th scope="col" className="px-6 py-3 text-center">Data Compra/Valor</th>
                                    <th scope="col" className="px-6 py-3 text-center">Km Recomendada</th>
                                    <th scope="col" className="px-6 py-3 text-center">Km Rodados</th>
                                    <th scope="col" className="px-6 py-3 text-center">Performance Score</th>
                                    <th scope="col" className="px-6 py-3 text-center">Custo/KM Rodado</th>

                                    <th scope="col" className="px-6 py-3 text-center">...</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.map((analysi) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={analysi.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {analysi.id}
                                        </th>
                                        <td className="px-1 py-4 text-center">{formatDate(analysi.created_at)}</td>
                                        <td className="px-6 py-4 text-center">{analysi.brand}<br />{analysi.code}</td>
                                        <td className="px-6 py-4 text-center">{moment(analysi.purchase_date).format("DD/MM/YYYY")}<br />R$ {analysi.price}</td>
                                        <td className="px-6 py-4 text-center">{analysi.durability_km} Km</td>
                                        <td className="px-6 py-4 text-center">{analysi.mileage_driven} Km</td>
                                        <td className="px-6 py-4 text-center">{analysi.performance_score}</td>
                                        <td className="px-6 py-4 text-center">
                                            R$ {analysi.cost}
                                        </td>

                                        <td className="px-2 py-4 text-center">

                                            <Link to={`/api/user/${analysi.id}/edit`} data-text="Editar" className="tooltips text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>


                                            <button type="button" onClick={() => handleDelete(analysi.id)} data-text="Excluir" className="tooltips text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
            <div className="flex pt-2 pb-2">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Anterior
                </button>
                <span className="text-white ms-3 p-1">Página {page} de {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default CostAnalysisIndex;
