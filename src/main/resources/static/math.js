/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    var QUEUE = MathJax.Hub.queue;  // shorthand for the queue
    var math = null;                // the element jax for the math output.

    //
    //  Get the element jax when MathJax has produced it.
    //
    QUEUE.Push(function () {
      math = MathJax.Hub.getAllJax("prueba")[0];
    });

    //
    //  The onchange event handler that typesets the
    //  math entered by the user
    //
    window.UpdateMath = function (TeX) {
        
		//console.log(TeX);
      QUEUE.Push(["Text",math,"\\displaystyle{"+TeX+"}"]);
    }

