import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
// Add your imports here
import LoginScreen from "pages/login-screen";
import RegistrationScreen from "pages/registration-screen";
import UserDashboard from "pages/user-dashboard";
import FounderDashboard from "pages/founder-dashboard";
import IdeaSubmissionForm from "pages/idea-submission-form";
import BuyerPersonaDefinition from "pages/buyer-persona-definition";
import EvidenceCollectionModule from "pages/evidence-collection-module";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<UserDashboard />} />
          <Route path="/login-screen" element={<LoginScreen />} />
          <Route path="/registration-screen" element={<RegistrationScreen />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/founder-dashboard" element={<FounderDashboard />} />
          <Route path="/idea-submission-form" element={<IdeaSubmissionForm />} />
          <Route path="/buyer-persona-definition" element={<BuyerPersonaDefinition />} />
          <Route path="/evidence-collection-module" element={<EvidenceCollectionModule />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;