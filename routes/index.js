const express = require('express');
const router = express.Router();
const Caixa = require('../models/caixa');

router.get('/', async function(req, res, next) {
  try {
    
    const extrato = await Caixa.findAll();
    
    extrato.forEach(caixa => {
      caixa.valor = parseFloat(caixa.valor);
    });

    let receitas = 0;
    let despesas = 0;

    for (const caixa of extrato) {
      if (caixa.status === 1) {
        receitas += caixa.valor;
      } else if (caixa.status === 0) {
        despesas += caixa.valor;
      }
    }

    const valorTotal = receitas - despesas;
    
    res.render('index', { 
      valorTotal: valorTotal,
      receitas: receitas,
      despesas: despesas,
      caixas: extrato,
      formataValor: (valor) => {
        return (valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
    });
    
  } catch (error) {
    console.error('Erro ao buscar extrato:', error);
    next(error);
  }
});

module.exports = router;
