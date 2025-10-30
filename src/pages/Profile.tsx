import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Heart, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Profile Settings
            </span>
          </h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Information */}
          <Card className="p-6 glass border-border/50">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Profile Information</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center text-3xl font-bold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-lg">John Doe</p>
                  <p className="text-sm text-muted-foreground">
                    john.doe@example.com
                  </p>
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-secondary/20 text-secondary"
                  >
                    Premium Member
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    defaultValue="John Doe"
                    className="bg-muted/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="bg-muted/30"
                  />
                </div>
              </div>
              <Button className="gradient-primary text-primary-foreground border-0">
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6 glass border-border/50">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Game Predictions</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new predictions are available
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Model Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about model improvements
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Performance Reports</p>
                  <p className="text-sm text-muted-foreground">
                    Weekly accuracy and performance summaries
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Favorite Teams */}
          <Card className="p-6 glass border-border/50">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Favorite Teams</h2>
            </div>
            <div className="space-y-3">
              {["Lakers", "Warriors", "Real Madrid", "Chiefs"].map((team) => (
                <div
                  key={team}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center font-bold">
                      {team.charAt(0)}
                    </div>
                    <span className="font-semibold">{team}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Add Team
              </Button>
            </div>
          </Card>

          {/* Account Settings */}
          <Card className="p-6 glass border-border/50">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Account Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="font-semibold mb-2">Subscription Plan</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Premium - Billed monthly
                </p>
                <Button variant="outline" size="sm">
                  Manage Subscription
                </Button>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="font-semibold mb-2">Change Password</p>
                <Button variant="outline" size="sm">
                  Update Password
                </Button>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <p className="font-semibold mb-2 text-destructive">
                  Danger Zone
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Permanently delete your account and all data
                </p>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
