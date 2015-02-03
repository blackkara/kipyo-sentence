var assert = require('assert');
var ks = require('../index.js');


var sampleKPYT = '$KPYT,1,fused:root,38.48727774348923,27.102491344772943,0000,100,25';
var sampleKPYG = '$KPYG,1,fused:root,38.48727774348923,27.102491344772943,0000,100,25,11,1';

var wrong01 = '$KPYT,1,fused:root,38.48727774348923,27.102491344772943,0000,100,25,11,1';
var wrong02 = '$KPYG,1,fused:root,38.48727774348923,27.102491344772943,0000,100,25';
var wrong03 = '$KPYTXY,1,fused:root,38.48727774348923,27.102491344772943,0000,100,25';
var wrong04 = 'WRONG,WRONG,WRONG,WRONG';
var wrong05 = 'BAD,BAD,BAD,BAD';

describe('$KPYT', function(){
      
    var tokens = sampleKPYT.split(ks.seperator);
        
    it('should be string', function(){
        assert.equal('string', typeof(sampleKPYT));
    });
    
    it('should be ' + ks.kpytIdentifier, function(){
        assert.equal(ks.kpytIdentifier, tokens[0].substring(1));
    });
    
    it('should have length ' + ks.kpytLength, function(){
        assert.equal(ks.kpytLength, tokens.length);
    });
    
    it('should not throw', function(){
        assert.doesNotThrow(function(){
            ks.parse(sampleKPYT);
        });
    });
    
    it('should throw', function(){
        assert.throws(function(){ ks.parse(wrong01);});
        assert.throws(function(){ ks.parse(wrong02);});
        assert.throws(function(){ ks.parse(wrong03);});
        assert.throws(function(){ ks.parse(wrong04);});
        assert.throws(function(){ ks.parse(wrong05);});
    });
    
});

describe('$KPYG', function(){
    
    
    var tokens = sampleKPYG.split(ks.seperator);
        
    it('should be string', function(){
        assert.equal('string', typeof(sampleKPYG));
    });
    
    it('should be ' + ks.kpygIdentifier, function(){
        assert.equal(ks.kpygIdentifier, tokens[0].substring(1));
    });
    
    it('should have length ' + ks.kpygLength, function(){
        assert.equal(ks.kpygLength, tokens.length);
    });
    
    it('should not throw', function(){
        assert.doesNotThrow(function(){
            ks.parse(sampleKPYG);
        });
    });
    
    it('should throw', function(){
        assert.throws(function(){ ks.parse(wrong01);});
        assert.throws(function(){ ks.parse(wrong02);});
        assert.throws(function(){ ks.parse(wrong03);});
        assert.throws(function(){ ks.parse(wrong04);});
        assert.throws(function(){ ks.parse(wrong05);});
    });
    
});
