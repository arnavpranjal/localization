"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Roles from "./roles";
import Stages from "./stages";
import Logo from "./logo";

import useLocalization from "./localizationhook";
export default function Page() {
  const { lr, ls } = useLocalization();

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Tabs defaultValue="demo" className="space-y-4 ">
          <TabsList>
            <TabsTrigger value="roles">Rename roles</TabsTrigger>
            <TabsTrigger value="stages">Rename stages</TabsTrigger>
            <TabsTrigger value="logo">Update Logo</TabsTrigger>
            <TabsTrigger value="demo">Loclization</TabsTrigger>
          </TabsList>
          <TabsContent value="demo">
            <p>Admin : {lr("Admin")} </p>
            <h1>Deal sponsor : {lr("Deal Sponsor")}</h1>
            <h1>admin : {lr("admin")} </h1>

            <h1>sksksks : {ls("sksksksk")}</h1>
            <h1>year1 : {ls("Year-1")}</h1>
          </TabsContent>
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
