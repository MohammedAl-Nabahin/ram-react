import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-md w-full">
        <div className="p-8 text-center space-y-6">
          <div className="text-8xl font-bold text-blue-500">404</div>

          <h1 className="text-3xl font-bold text-white">Page Not Found</h1>

          <p className="text-gray-400">
            The page you're looking for doesn't exist in this dimension.
          </p>

          <Link to="/">
            <Button className="w-full">Back to Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
