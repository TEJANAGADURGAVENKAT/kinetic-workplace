import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Users,
  Target,
  Globe,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateTask = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    // Step 1: Task Details
    title: "",
    description: "",
    category: "",
    difficulty: "",
    instructions: [""],
    requirements: [""],
    
    // Step 2: Targeting
    targetCountries: [],
    minAge: "",
    maxAge: "",
    languages: [],
    deviceTypes: [],
    
    // Step 3: Payment & Slots
    paymentPerTask: "",
    totalSlots: "",
    budget: "",
    duration: "",
    autoApproval: false
  });

  const categories = [
    "Social Media",
    "App Testing", 
    "Surveys",
    "Data Entry",
    "Content Creation",
    "Website Testing",
    "Reviews",
    "Translation"
  ];

  const difficulties = [
    { value: "easy", label: "Easy (1-5 minutes)" },
    { value: "medium", label: "Medium (5-15 minutes)" },
    { value: "hard", label: "Hard (15+ minutes)" }
  ];

  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", 
    "Germany", "France", "Spain", "Italy", "Brazil", "Mexico"
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Italian", 
    "Portuguese", "Chinese", "Japanese", "Korean"
  ];

  const deviceTypes = ["Desktop", "Mobile", "Tablet"];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    const newArray = [...formData[field as keyof typeof formData] as string[]];
    newArray[index] = value;
    handleInputChange(field, newArray);
  };

  const addArrayItem = (field: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    handleInputChange(field, [...currentArray, ""]);
  };

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    handleInputChange(field, currentArray.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Task created successfully!",
      description: "Your task campaign is now live and workers can start applying.",
    });
    navigate("/employer/campaigns");
  };

  const calculateBudget = () => {
    const payment = parseFloat(formData.paymentPerTask) || 0;
    const slots = parseInt(formData.totalSlots) || 0;
    return payment * slots;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Follow Instagram Account & Like Posts"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Task Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what workers need to do in detail..."
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty Level *</Label>
                <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty.value} value={difficulty.value}>
                        {difficulty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Step-by-Step Instructions *</Label>
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder={`Step ${index + 1}`}
                    value={instruction}
                    onChange={(e) => handleArrayInputChange('instructions', index, e.target.value)}
                  />
                  {formData.instructions.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem('instructions', index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('instructions')}
              >
                Add Step
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Requirements</Label>
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder={`Requirement ${index + 1}`}
                    value={requirement}
                    onChange={(e) => handleArrayInputChange('requirements', index, e.target.value)}
                  />
                  {formData.requirements.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem('requirements', index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('requirements')}
              >
                Add Requirement
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <Label>Target Countries (Optional)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {countries.map((country) => (
                  <div key={country} className="flex items-center space-x-2">
                    <Checkbox
                      id={country}
                      checked={formData.targetCountries.includes(country)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleInputChange('targetCountries', [...formData.targetCountries, country]);
                        } else {
                          handleInputChange('targetCountries', 
                            formData.targetCountries.filter(c => c !== country)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={country} className="text-sm">{country}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minAge">Minimum Age</Label>
                <Select value={formData.minAge} onValueChange={(value) => handleInputChange('minAge', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18">18+</SelectItem>
                    <SelectItem value="21">21+</SelectItem>
                    <SelectItem value="25">25+</SelectItem>
                    <SelectItem value="30">30+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAge">Maximum Age</Label>
                <Select value={formData.maxAge} onValueChange={(value) => handleInputChange('maxAge', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="35">35</SelectItem>
                    <SelectItem value="45">45</SelectItem>
                    <SelectItem value="55">55</SelectItem>
                    <SelectItem value="65">65</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Required Languages</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={formData.languages.includes(language)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleInputChange('languages', [...formData.languages, language]);
                        } else {
                          handleInputChange('languages', 
                            formData.languages.filter(l => l !== language)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={language} className="text-sm">{language}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Device Requirements</Label>
              <div className="flex gap-4">
                {deviceTypes.map((device) => (
                  <div key={device} className="flex items-center space-x-2">
                    <Checkbox
                      id={device}
                      checked={formData.deviceTypes.includes(device)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleInputChange('deviceTypes', [...formData.deviceTypes, device]);
                        } else {
                          handleInputChange('deviceTypes', 
                            formData.deviceTypes.filter(d => d !== device)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={device} className="text-sm">{device}</Label>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentPerTask">Payment per Task *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="paymentPerTask"
                    type="number"
                    step="0.01"
                    min="0.10"
                    placeholder="0.50"
                    className="pl-10"
                    value={formData.paymentPerTask}
                    onChange={(e) => handleInputChange('paymentPerTask', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalSlots">Number of Workers *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="totalSlots"
                    type="number"
                    min="1"
                    placeholder="100"
                    className="pl-10"
                    value={formData.totalSlots}
                    onChange={(e) => handleInputChange('totalSlots', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Campaign Duration *</Label>
              <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">1 week</SelectItem>
                  <SelectItem value="14">2 weeks</SelectItem>
                  <SelectItem value="30">1 month</SelectItem>
                  <SelectItem value="60">2 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoApproval"
                checked={formData.autoApproval}
                onCheckedChange={(checked) => handleInputChange('autoApproval', checked)}
              />
              <Label htmlFor="autoApproval" className="text-sm">
                Enable auto-approval for submissions (recommended for simple tasks)
              </Label>
            </div>

            {/* Budget Summary */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Budget Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Payment per task:</span>
                  <span className="font-semibold">${formData.paymentPerTask || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of workers:</span>
                  <span className="font-semibold">{formData.totalSlots || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform fee (5%):</span>
                  <span className="font-semibold">${(calculateBudget() * 0.05).toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total Budget:</span>
                  <span className="font-bold text-success">
                    ${(calculateBudget() * 1.05).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create New Task</h1>
            <p className="text-muted-foreground">Set up your task campaign in 3 simple steps</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/employer">← Back to Dashboard</Link>
          </Button>
        </div>

        {/* Progress Indicator */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`h-0.5 w-20 mx-4 ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className={currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}>
                <Target className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Task Details</span>
              </div>
              <div className={currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}>
                <Globe className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Targeting</span>
              </div>
              <div className={currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}>
                <DollarSign className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Payment & Launch</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="bg-gradient-primary"
              disabled={!formData.title || !formData.description || !formData.category}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-primary"
              disabled={!formData.paymentPerTask || !formData.totalSlots || !formData.duration}
            >
              Create Campaign
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTask;