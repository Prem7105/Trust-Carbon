import React, { useState } from 'react';
import { Upload, FileText, MapPin, Calendar, DollarSign, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Project, ProjectDocument } from '../../types';

interface SubmitProjectProps {
  onSubmit: (project: Partial<Project>) => void;
}

const SubmitProject: React.FC<SubmitProjectProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: 'Renewable Energy',
    location: '',
    duration: '',
    budget: 0,
    estimatedCredits: 0,
    documents: []
  });

  const steps = [
    { id: 1, title: 'Project Details', description: 'Basic information about your project' },
    { id: 2, title: 'Location & Timeline', description: 'Where and when your project will take place' },
    { id: 3, title: 'Budget & Credits', description: 'Financial details and expected carbon credits' },
    { id: 4, title: 'Documentation', description: 'Upload supporting documents' },
    { id: 5, title: 'Review & Submit', description: 'Review all information before submission' }
  ];

  const categories = [
    'Renewable Energy',
    'Forest Conservation',
    'Waste Management',
    'Transportation',
    'Agriculture'
  ];

  const handleInputChange = (field: string, value: any) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newDocuments: ProjectDocument[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        uploadDate: new Date().toISOString()
      }));
      
      handleInputChange('documents', [...(projectData.documents || []), ...newDocuments]);
    }
  };

  const removeDocument = (docId: string) => {
    const updatedDocs = projectData.documents?.filter(doc => doc.id !== docId) || [];
    handleInputChange('documents', updatedDocs);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const finalProject = {
      ...projectData,
      id: Date.now().toString(),
      status: 'Submitted' as const,
      submittedBy: 'current-user',
      submittedDate: new Date().toISOString()
    };
    onSubmit(finalProject);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={projectData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your project title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={projectData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                value={projectData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your carbon reduction project in detail..."
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Project Location
              </label>
              <input
                type="text"
                value={projectData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="City, State, Country"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Project Duration
              </label>
              <select
                value={projectData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select duration</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Location Guidelines</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Provide specific geographic coordinates if available</li>
                <li>• Include relevant permits or land use agreements</li>
                <li>• Consider environmental impact assessments</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Project Budget (USD)
              </label>
              <input
                type="number"
                value={projectData.budget}
                onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter total project budget"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Carbon Credits
              </label>
              <input
                type="number"
                value={projectData.estimatedCredits}
                onChange={(e) => handleInputChange('estimatedCredits', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Expected carbon credits to be generated"
                min="0"
                required
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Credit Calculation</h4>
              <div className="text-sm text-green-800 space-y-2">
                <p>• 1 credit = 1 metric ton of CO₂ equivalent reduced/removed</p>
                <p>• Current market rate: $2.50 per credit</p>
                <p>• Estimated value: ${((projectData.estimatedCredits || 0) * 2.5).toLocaleString()}</p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <FileText className="w-4 h-4 inline mr-1" />
                Project Documentation
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 cursor-pointer inline-block"
                >
                  Choose Files
                </label>
              </div>
            </div>

            {projectData.documents && projectData.documents.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Uploaded Documents</h4>
                <div className="space-y-2">
                  {projectData.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {(doc.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeDocument(doc.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Required Documents</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Project proposal or business plan</li>
                <li>• Environmental impact assessment</li>
                <li>• Baseline emissions calculation</li>
                <li>• Monitoring and verification plan</li>
                <li>• Relevant permits and approvals</li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Title</p>
                  <p className="font-medium">{projectData.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium">{projectData.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{projectData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{projectData.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-medium">${projectData.budget?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Credits</p>
                  <p className="font-medium">{projectData.estimatedCredits}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-medium">{projectData.description}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Documents</p>
                <p className="font-medium">{projectData.documents?.length || 0} files uploaded</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your project will be reviewed by our verification team</li>
                <li>• Review process typically takes 5-10 business days</li>
                <li>• You'll receive email updates on the status</li>
                <li>• Approved projects will be added to the marketplace</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-green-600 border-green-600 text-white' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        {currentStep < steps.length ? (
          <button
            onClick={nextStep}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit Project
            <Check className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SubmitProject;