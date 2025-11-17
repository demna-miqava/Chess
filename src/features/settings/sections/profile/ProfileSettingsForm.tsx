import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

export const ProfileSettingsForm = () => {
  const [profileImage, setProfileImage] = useState<string>("");
  const [bio, setBio] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Profile Picture Upload */}
        <div className="space-y-3">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-6">
            <Avatar className="size-24">
              <AvatarImage src={profileImage} alt="Profile" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <label htmlFor="profile-picture-upload">
                <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent transition-colors">
                  <Upload className="size-4" />
                  <span className="text-sm">Upload Photo</span>
                </div>
                <input
                  id="profile-picture-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-muted-foreground mt-2">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-3">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us a little about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            className="resize-none"
          />
          <p className="text-sm text-muted-foreground">
            {bio.length}/500 characters
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Save Changes
      </Button>
    </form>
  );
};
