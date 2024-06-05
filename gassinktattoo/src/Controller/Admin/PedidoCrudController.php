<?php

namespace App\Controller\Admin;

use App\Entity\Pedido;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class PedidoCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Pedido::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')
                ->hideOnForm(),
            NumberField::new('price', 'Precio'),
            ChoiceField::new('status', 'Estado')
                ->setChoices([
                    'En reparto' => 'En reparto',
                    'Enviado' => 'Enviado',
                    'Pendiente' => 'Pendiente'
                ]),
            TextField::new('calle', 'Calle'),
            TextField::new('ciudad', 'Ciudad'),
            TextField::new('provincia', 'Provincia'),
            TextField::new('pais', 'País'),
            TextField::new('numero', 'Número / puerta'),
            TextField::new('cp', 'Código postal'),
            TextField::new('nombreCompleto', 'Código postal'),
            TextField::new('phone', 'Teléfono'),
            AssociationField::new('cliente', 'Cliente')
                ->formatValue(function ($value, $entity) {
                    return $entity->getCliente()->getUsername();
                })
                ->hideOnForm(),
        ];
    }
}
