import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
export default function Phases() {
  const data = [
    { label: "Name", value: "John Doe" },
    { label: "Email", value: "john@example.com" },
    { label: "Phone", value: "+1 123 456 7890" },
    { label: "Address", value: "123 Main St, Anytown USA" },
  ];
  return (
    <Card className="pt-2">
      <h3 className="font-semibold mb-2 ml-2.5">System name</h3>
      <div>
        <ul>
          {data.map((item, index) => (
            <div
              key={index}
              //   style={{ borderTop: "1px solid #e2e8f0" }}
              style={{
                borderTop: "1px solid #e2e8f0",
                appearance: "none",
                outline: "none",
              }}

              //   className="p-2"
            >
              {/* <li className="p-2.5">{item.value}</li> */}
              <input
                type="text"
                className="p-2"
                value={item.value}
                // style={{
                //   border: "1px solid #e2e8f0",
                //   appearance: "none",
                //   outline: "none",
                // }}
              ></input>
            </div>
          ))}
        </ul>
      </div>
    </Card>
  );
}
