<?php

namespace App\Controller\Admin;

use App\Entity\Merchandising;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class MerchandisingCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Merchandising::class;
    }

    public function configureFields(string $pageName): iterable
    {
        $imageField = ImageField::new('image', 'Foto Producto')
            ->setBasePath('/uploads/images/merchandising')
            ->setUploadDir('public/uploads/images/merchandising')
            ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]');

        // VERIFICAMOS SI ESTAMOS EN EDITAR PARA CORREGIR EL FALLO DEL CAMPO IMAGEN CON REQUIRE
        if ($pageName === Crud::PAGE_EDIT) {
            $imageField->setRequired(false);
        }

        return [
            IdField::new('id')
                ->hideOnForm(),
            TextField::new('name', 'Nombre'),
            TextEditorField::new('description', 'Descripción'),
            NumberField::new('price', 'Precio'),
            $imageField,
            ChoiceField::new('size', 'Tamaños')
                ->setRequired(false)
                ->setChoices([
                    'XS' => 'XS',
                    'S' => 'S',
                    'M' => 'M',
                    'L' => 'L',
                    'XL' => 'XL'
                ])
                ->allowMultipleChoices(),
            ChoiceField::new('type', 'Tipo')
                ->setChoices([
                    'Gorra' => 'gorra',
                    'Camiseta' => 'camiseta',
                    'Bolso' => 'bolso'
                ]),
        ];
    }

    public function deleteEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        parent::deleteEntity($entityManager, $entityInstance);

        // ELIMINAR LA IMAGEN ASOCIADA AL PRODUCTO
        $photo = $entityInstance->getImage();
        $photoPath = "../public/uploads/images/merchandising/" . $photo;
        if (file_exists($photoPath)) {
            unlink($photoPath);
        }
    }
}
