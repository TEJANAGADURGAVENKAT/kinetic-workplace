import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User,
  Star,
  MapPin,
  Calendar,
  Camera,
  Save,
  Settings,
  Award,
  Target,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WorkerProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Experienced digital marketer with expertise in social media management and content creation. Always deliver quality work on time.",
    skills: ["Social Media", "Content Writing", "App Testing", "Surveys"],
    languages: ["English", "Spanish"],
    timezone: "EST",
    availability: "Full-time"
  });

  const workerStats = {
    rating: 4.9,
    totalTasks: 23,
    successRate: 98,
    memberSince: "September 2023",
    totalEarned: 1456.25,
    badges: [
      { name: "Top Performer", icon: Award, color: "text-yellow-500" },
      { name: "Fast Completer", icon: Target, color: "text-blue-500" },
      { name: "Quality Worker", icon: Star, color: "text-purple-500" }
    ]
  };

  const skillOptions = [
    "Social Media", "Content Writing", "App Testing", "Surveys", 
    "Data Entry", "Translation", "Voice Recording", "Product Reviews",
    "Website Testing", "Email Marketing", "SEO", "Graphic Design"
  ];

  const languageOptions = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese",
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Russian"
  ];

  const handleSave = () => {
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    const updatedSkills = profileData.skills.includes(skill)
      ? profileData.skills.filter(s => s !== skill)
      : [...profileData.skills, skill];
    handleInputChange('skills', updatedSkills);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Worker Profile</h1>
            <p className="text-muted-foreground">Manage your profile and preferences</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link to="/worker">← Back to Dashboard</Link>
            </Button>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                    <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                      <Camera className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-muted-foreground flex items-center justify-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profileData.location}
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{workerStats.rating}</span>
                  <span className="text-muted-foreground">({workerStats.totalTasks} tasks)</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{workerStats.successRate}%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">${workerStats.totalEarned}</p>
                    <p className="text-xs text-muted-foreground">Total Earned</p>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-center space-x-1">
                  {workerStats.badges.map((badge, index) => (
                    <div key={badge.name} className="text-center">
                      <badge.icon className={`h-6 w-6 mx-auto ${badge.color}`} />
                      <p className="text-xs mt-1">{badge.name}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Member since {workerStats.memberSince}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills & Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={profileData.skills.includes(skill)}
                          onCheckedChange={() => toggleSkill(skill)}
                          disabled={!isEditing}
                        />
                        <Label htmlFor={skill} className="text-sm">{skill}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={profileData.timezone} 
                      onValueChange={(value) => handleInputChange('timezone', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                        <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                        <SelectItem value="CST">Central Time (CST)</SelectItem>
                        <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select 
                      value={profileData.availability} 
                      onValueChange={(value) => handleInputChange('availability', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Weekends">Weekends only</SelectItem>
                        <SelectItem value="Evenings">Evenings only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Languages</Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;