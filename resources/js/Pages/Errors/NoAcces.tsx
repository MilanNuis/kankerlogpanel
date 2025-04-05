export default function noAccess() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="text-4xl font-bold">No Access</h1>
            <p className="mt-4 text-lg">
                Je bent geen toegang tot deze pagina. Neem contact op met de
                beheerder als je denkt dat dit een fout is.
            </p>
        </div>
    );
}
