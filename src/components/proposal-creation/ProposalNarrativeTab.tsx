
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X, Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

interface CustomField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea';
}

const ProposalNarrativeTab: React.FC = () => {
  const [narrative, setNarrative] = useState("");
  const [workPlan, setWorkPlan] = useState("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const addNewField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      label: `Custom Field ${customFields.length + 1}`,
      value: "",
      type: 'textarea'
    };
    setCustomFields([...customFields, newField]);
  };

  const removeField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<CustomField>) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const ToolbarButton = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <Button variant="ghost" size="sm" title={title} className="h-8 w-8 p-0">
      <Icon className="w-4 h-4" />
    </Button>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="narrative" className="text-sm font-medium mb-2 block">
            Project Narrative
          </Label>
          <div className="border rounded-md">
            <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
              <ToolbarButton icon={Bold} title="Bold" />
              <ToolbarButton icon={Italic} title="Italic" />
              <ToolbarButton icon={Underline} title="Underline" />
              <div className="w-px h-4 bg-gray-300 mx-1" />
              <ToolbarButton icon={List} title="Bullet List" />
              <ToolbarButton icon={ListOrdered} title="Numbered List" />
            </div>
            <Textarea
              id="narrative"
              placeholder="Enter project narrative..."
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              className="min-h-[200px] border-0 focus-visible:ring-0"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="workPlan" className="text-sm font-medium">
            Work Plan
          </Label>
          <Textarea
            id="workPlan"
            placeholder="Enter project work plan..."
            value={workPlan}
            onChange={(e) => setWorkPlan(e.target.value)}
            className="mt-1 min-h-[150px]"
          />
        </div>

        {customFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <Input
                value={field.label}
                onChange={(e) => updateField(field.id, { label: e.target.value })}
                className="font-medium text-sm"
                placeholder="Field label"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeField(field.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Textarea
              value={field.value}
              onChange={(e) => updateField(field.id, { value: e.target.value })}
              placeholder={`Enter ${field.label.toLowerCase()}...`}
              className="min-h-[100px]"
            />
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addNewField}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Field
        </Button>
      </div>
    </div>
  );
};

export default ProposalNarrativeTab;
