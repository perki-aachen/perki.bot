import Layout from "./layout";

interface BirthdayStatusProps {
  readonly lastExecution: Date | null;
  readonly nextExecution: Date;
}

export default function BirthdayStatus({ lastExecution, nextExecution }: BirthdayStatusProps) {
  return (
    <Layout>
      <div className="bg-red-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Birthday Check Status</h1>
        <p className="mb-2">
          Last Execution: {lastExecution ? lastExecution.toLocaleString() : "Never"}
        </p>
        <p className="mb-2">Next Execution: {nextExecution.toLocaleString()}</p>
      </div>
    </Layout>
  );
}
