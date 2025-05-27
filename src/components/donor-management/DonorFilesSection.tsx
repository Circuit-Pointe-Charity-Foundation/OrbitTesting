
import React from "react";
import { Button } from "@/components/ui/button";

const DonorFilesSection: React.FC = () => (
  <div>
    <h3 className="font-bold mb-4">Files</h3>
    <div className="border-2 border-dashed border-gray-300 p-8 rounded-md text-center">
      <p className="text-sm text-gray-500">
        Drag and drop files here or
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => document.getElementById('donorFileUpload')?.click()}
      >
        Browse
      </Button>
      <input
        id="donorFileUpload"
        type="file"
        className="hidden"
        multiple
      />
    </div>
  </div>
);

export default DonorFilesSection;
