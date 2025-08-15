import ManualEntryForm from "@/components/forms/ManualEntryForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABINFO = [
    {
        title: "Manual Entry",
        tabId: "manual-entry",
    },
    {
        title: "Upload CSV",
        tabId: "upload-csv",
    },
    {
        title: "Excel Spreadsheet",
        tabId: "excel-spreadsheet",
    },
];

const AddMembers = () => {
    return (
        <Tabs defaultValue="manual-entry" className="w-full gap-6">
            <TabsList className="mx-auto bg-[#ECEEF4] h-fit p-1 gap-1">
                {TABINFO.map(({ tabId, title }) => (
                    <TabsTrigger
                        key={tabId}
                        value={tabId}
                        className="h-11 px-6 py-2.5 bg-transparent hover:bg-background text-independence transition-colors"
                    >
                        {title}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value="manual-entry">
                <ManualEntryForm />
            </TabsContent>
            <TabsContent value="upload-csv">Change your password here.</TabsContent>
            <TabsContent value="excel-spreadsheet">Change your password here.</TabsContent>
        </Tabs>
    );
};

export default AddMembers;
