import Router from "@/shared/Router";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import MetaTag from "@/components/MetaTag";

function App() {
  return (
    <>
      <MetaTag title="여성을 위한 스포츠 웨어 플랫폼" />
      <Router />
      <Toaster />
    </>
  );
}

export default App;
