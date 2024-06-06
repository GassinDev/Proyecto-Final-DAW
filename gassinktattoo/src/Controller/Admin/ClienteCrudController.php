<?php

namespace App\Controller\Admin;

use App\Entity\Cliente;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ClienteCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Cliente::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        $imageField = ImageField::new('imagePerfil', 'Foto de perfil')
            ->setBasePath('/uploads/images/fotosPerfil')
            ->setUploadDir('public/uploads/images/fotosPerfil')
            ->setUploadedFileNamePattern('[year]-[month]-[day]-[contenthash].[extension]');

        return [
            IdField::new('id')
            ->hideOnForm(),
            TextField::new('username'),
            EmailField::new('email'),
            $imageField,
            TextField::new('password', 'Password')
            ->onlyOnForms(),
            BooleanField::new('isVerified', 'Verified'),
            BooleanField::new('isWorker', 'Worker'),
            ChoiceField::new('roles')
            ->setChoices(['ROLE_ADMIN' => 'ROLE_ADMIN', 'ROLE_USER' => 'ROLE_USER'])
            ->allowMultipleChoices()
        ];
    }
    
}
