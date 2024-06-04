<?php

namespace App\Controller\Admin;

use App\Entity\Tatuaje;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class TatuajeCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Tatuaje::class;
    }

    public function configureFields(string $pageName): iterable
    {
        $imageField = ImageField::new('image', 'Imagen tatuaje')
            ->setBasePath('/uploads/images/tatuajes')
            ->setUploadDir('public/uploads/images/tatuajes')
            ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]');

        // VERIFICAMOS SI ESTAMOS EN EDITAR PARA CORREGIR EL FALLO DEL CAMPO IMAGEN CON REQUIRE
        if ($pageName === Crud::PAGE_EDIT) {
            $imageField->setRequired(false);
        }

        return [
            IdField::new('id')
                ->hideOnForm(),
            TextField::new('name', 'Nombre'),
            $imageField,
            ChoiceField::new('style', 'Estilo')
                ->setRequired(false)
                ->setChoices([
                    'Realismo' => 'Realismo',
                    'Anime' => 'Anime',
                    'Tribales' => 'Tribales',
                ]),
            TextField::new('price', 'Precio'),
        ];
    }
    
}
