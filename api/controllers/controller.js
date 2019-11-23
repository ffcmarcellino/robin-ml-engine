const spawn = require("child_process").spawn;

exports.prediction = function(req, res) {
    const {url} = req.query;
    const pythonProcess = spawn('python',["./ml-model/cnn.py", url]);
    pythonProcess.stdout.on('data', function(data) {
        ans = data.toString().replace(/\n|\r|\[|\]/g, "").split(",");
    });
    pythonProcess.on('close', function(code) {
        res.json({
          url,
          category: ans[0],
          pred_probs: {
            cardboard: parseFloat(ans[1]),
            glass: parseFloat(ans[2]),
            metal: parseFloat(ans[3]),
            paper: parseFloat(ans[4]),
            plastic: parseFloat(ans[5]),
            trash: parseFloat(ans[6])
          }
        });
    });
    pythonProcess.on('error', function(err) { res.json({err}); });
}
