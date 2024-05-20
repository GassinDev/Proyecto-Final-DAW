<?php

namespace App\Controller\Admin;

use App\Entity\Producto;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ProductoCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Producto::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        $uniqueId = uniqid();

        return [
            IdField::new('id')
                ->hideOnForm(),
            TextField::new('name', 'Nombre'),
            TextEditorField::new('description', 'Descripción'),
            NumberField::new('price', 'Precio'),
            ImageField::new('image', 'Foto Producto')
                ->setBasePath('/uploads/images/productos')
                ->setUploadDir('public/uploads/images/productos')
                ->setUploadedFileNamePattern($uniqueId.'.[extension]'),
            NumberField::new('stock', 'Stock'),
            ChoiceField::new('type', 'Tipo')
            ->setChoices([
                'Ropa' => 'ropa',
                'Artículos' => 'articulo',
                'Cremas' => 'crema',
                'Sprays' => 'spray',]),
            ChoiceField::new('category', 'Categoria')
            ->setChoices([
                'Merchandising' => 'merchandising',
                'Productos de cuidado personal' => 'cuidadoPersonal']),
        ];
    }

    public function deleteEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        parent::deleteEntity($entityManager, $entityInstance);

        // ELIMINAR LA IMAGEN ASOCIADA AL PRODUCTO
        $photo = $entityInstance->getImage();
        $photoPath = "../public/uploads/images/productos/" . $photo;
        if (file_exists($photoPath)) {
            unlink($photoPath);
        }
    }
    
}
