import { Category } from "@/shared/types/category";

const CatalogNavigation = ({
  params,
  CategoriesData,
}: {
  params: any;
  CategoriesData: Category[];
}) => {
  return (
    <>
      <nav>
        <ul>
          {CategoriesData.map((Category) => (
            <li>
              <a href="#">{Category.name_category}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default CatalogNavigation;