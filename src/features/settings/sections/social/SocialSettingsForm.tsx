import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type PrivacyLevel = "everyone" | "friends" | "nobody";

export const SocialSettingsForm = () => {
  const [messagesPrivacy, setMessagesPrivacy] =
    useState<PrivacyLevel>("everyone");
  const [gameChatPrivacy, setGameChatPrivacy] =
    useState<PrivacyLevel>("everyone");
  const [allowFriendRequests, setAllowFriendRequests] = useState(true);

  const messagesEnabled = messagesPrivacy !== "nobody";
  const gameChatEnabled = gameChatPrivacy !== "nobody";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Social settings:", {
      messagesPrivacy,
      gameChatPrivacy,
      allowFriendRequests,
    });
    // TODO: Implement save logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {/* Send and receive direct messages */}
        <div className="space-y-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="send-receive-messages">
                Send and receive direct messages
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow other users to send you private messages
              </p>
            </div>
            <Switch
              id="send-receive-messages"
              checked={messagesEnabled}
              disabled={!messagesEnabled}
              onCheckedChange={(checked) => {
                if (checked && messagesPrivacy === "nobody") {
                  setMessagesPrivacy("everyone");
                }
              }}
            />
          </div>
          <RadioGroup
            value={messagesPrivacy}
            onValueChange={(value) => setMessagesPrivacy(value as PrivacyLevel)}
            className="pl-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="everyone" id="messages-everyone" />
              <Label htmlFor="messages-everyone" className="cursor-pointer">
                Everyone
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="friends" id="messages-friends" />
              <Label htmlFor="messages-friends" className="cursor-pointer">
                Only friends
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nobody" id="messages-nobody" />
              <Label htmlFor="messages-nobody" className="cursor-pointer">
                Nobody
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Game chat */}
        <div className="space-y-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="game-chat">Game chat</Label>
              <p className="text-sm text-muted-foreground">
                Enable chat during games with your opponent
              </p>
            </div>
            <Switch
              id="game-chat"
              checked={gameChatEnabled}
              disabled={!gameChatEnabled}
              onCheckedChange={(checked) => {
                if (checked && gameChatPrivacy === "nobody") {
                  setGameChatPrivacy("everyone");
                }
              }}
            />
          </div>
          <RadioGroup
            value={gameChatPrivacy}
            onValueChange={(value) => setGameChatPrivacy(value as PrivacyLevel)}
            className="pl-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="everyone" id="chat-everyone" />
              <Label htmlFor="chat-everyone" className="cursor-pointer">
                Everyone
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="friends" id="chat-friends" />
              <Label htmlFor="chat-friends" className="cursor-pointer">
                Only friends
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nobody" id="chat-nobody" />
              <Label htmlFor="chat-nobody" className="cursor-pointer">
                Nobody
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Allow friend requests */}
        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="allow-friend-requests">Allow friend requests</Label>
            <p className="text-sm text-muted-foreground">
              Let other users send you friend requests
            </p>
          </div>
          <Switch
            id="allow-friend-requests"
            checked={allowFriendRequests}
            onCheckedChange={setAllowFriendRequests}
          />
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Save Changes
      </Button>
    </form>
  );
};
