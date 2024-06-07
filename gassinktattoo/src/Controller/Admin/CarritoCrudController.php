<?php

namespace App\Controller\Admin;

use App\Entity\Carrito;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class CarritoCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Carrito::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            AssociationField::new('cliente', 'Cliente')
                ->formatValue(function ($value, $entity) {
                    return $entity->getCliente()->getUsername();
                })
                ->hideOnForm(),
            AssociationField::new('producto', 'Producto')
                ->formatValue(function ($value, $entity) {
                    $producto = $entity->getProducto();
                    return $producto ? $producto->getName() : '';
                })
                ->hideOnForm(),
            AssociationField::new('merchandising', 'Merchandising')
                ->formatValue(function ($value, $entity) {
                    $merchandising = $entity->getMerchandising();
                    return $merchandising ? $merchandising->getName() : '';
                })
                ->hideOnForm(),
            ChoiceField::new('size', 'Tamaños')
                ->setRequired(false)
                ->setChoices([
                    'XS' => 'XS',
                    'S' => 'S',
                    'M' => 'M',
                    'L' => 'L',
                    'XL' => 'XL',
                    'Tamaño único' => 'Tamaño único'
                ])
                ->hideOnForm(),
            NumberField::new('quantity', 'Cantidad')
        ];
    }
}
