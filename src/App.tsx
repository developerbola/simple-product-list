import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Products from "./components/Products";
import Categories from "./components/Categories";

const App = () => {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <main className="h-[70svh] w-[80%] ">
        <Tabs defaultValue="products" className="size-full">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <Products />
          </TabsContent>
          <TabsContent value="categories">
            <Categories />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default App;
