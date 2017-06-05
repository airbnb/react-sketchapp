export default (...fs) => arg => fs.reduceRight((a, f) => f(a), arg);
