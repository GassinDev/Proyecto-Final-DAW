<?php

namespace App\Controller\Admin;

use App\Entity\Cita;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class CitaCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Cita::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')
                ->hideOnForm(),
            AssociationField::new('tatuaje', 'Tatuaje')
                ->formatValue(function ($value, $entity) {
                    return $entity->getTatuaje()->getName();
                })
                ->hideOnForm(),
            TextField::new('description', 'Descripción'),
            AssociationField::new('cliente', 'Cliente')
                ->formatValue(function ($value, $entity) {
                    return $entity->getCliente()->getUsername();
                })
                ->hideOnForm(),
            AssociationField::new('worker', 'Tatuador')
                ->formatValue(function ($value, $entity) {
                    return $entity->getWorker()->getUsername();
                })
                ->hideOnForm(),
        ];
    }
}
