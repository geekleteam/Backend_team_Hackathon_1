import ComparisonTable from "./components/organisms/ComparisonTable";
import SolutionFinder from "./components/pages/SolutionFinder";
import { Layout } from "./components/templates/Layout";

export default function Home() {
    return (
        <Layout>
            <div className="flex flex-col w-full">
                <ComparisonTable />
            </div>
        </Layout>
    );
}
