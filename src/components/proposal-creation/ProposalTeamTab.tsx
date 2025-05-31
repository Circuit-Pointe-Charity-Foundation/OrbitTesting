
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface TeamMember {
  id: string;
  memberId: string;
  role: string;
}

const availableMembers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
  { id: "4", name: "Sarah Wilson" },
  { id: "5", name: "David Brown" },
];

const ProposalTeamTab: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [memberRole, setMemberRole] = useState("");

  const addNewMember = () => {
    if (selectedMember && memberRole) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        memberId: selectedMember,
        role: memberRole
      };
      setTeamMembers([...teamMembers, newMember]);
      setSelectedMember("");
      setMemberRole("");
    }
  };

  const removeMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const updateMemberRole = (id: string, role: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, role } : member
    ));
  };

  const getMemberName = (memberId: string) => {
    return availableMembers.find(member => member.id === memberId)?.name || "";
  };

  const getAvailableMembers = () => {
    const selectedMemberIds = teamMembers.map(member => member.memberId);
    return availableMembers.filter(member => !selectedMemberIds.includes(member.id));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="member-select" className="text-sm font-medium">
            Select team member
          </Label>
          <Select value={selectedMember} onValueChange={setSelectedMember}>
            <SelectTrigger id="member-select" className="mt-1">
              <SelectValue placeholder="Select member" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableMembers().map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="member-role" className="text-sm font-medium">
            Role
          </Label>
          <Input
            id="member-role"
            placeholder="Enter role"
            value={memberRole}
            onChange={(e) => setMemberRole(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <Button
        onClick={addNewMember}
        disabled={!selectedMember || !memberRole}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add New Member
      </Button>

      {teamMembers.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3">Team Members ({teamMembers.length})</h4>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">{getMemberName(member.memberId)}</p>
                    <p className="text-xs text-gray-500">Team Member</p>
                  </div>
                  <Input
                    value={member.role}
                    onChange={(e) => updateMemberRole(member.id, e.target.value)}
                    placeholder="Role"
                    className="text-sm"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMember(member.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {teamMembers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No team members added yet.</p>
          <p className="text-xs text-gray-400 mt-1">At least one team member is required.</p>
        </div>
      )}
    </div>
  );
};

export default ProposalTeamTab;
