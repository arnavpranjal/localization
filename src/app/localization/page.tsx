import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Roles from "./roles";
import Stages from "./stages";
import Logo from "./logo";
export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Tabs defaultValue="roles" className="space-y-4 ">
          <TabsList>
            <TabsTrigger value="roles">Rename roles</TabsTrigger>
            <TabsTrigger value="stages">Rename stages</TabsTrigger>
            <TabsTrigger value="logo">Update Logo</TabsTrigger>
          </TabsList>

          <TabsContent value="roles">
            <Roles />
          </TabsContent>
          <TabsContent value="stages">
            <Stages />
          </TabsContent>
          <TabsContent value="logo">
            <Logo />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
