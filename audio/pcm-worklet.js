class TravelPCM extends AudioWorkletProcessor {
 constructor(){super();this.samples=[];this.position=0;}
 process(inputs){const input=inputs[0]?.[0];if(!input)return true;const step=sampleRate/16000;for(let i=0;i<input.length;i++){this.samples.push(input[i]);}const output=[];while(this.position+1<this.samples.length){const left=Math.floor(this.position),mix=this.position-left;const value=this.samples[left]*(1-mix)+this.samples[left+1]*mix;output.push(Math.max(-32768,Math.min(32767,Math.round(value*32767))));this.position+=step;}const consumed=Math.floor(this.position);this.samples.splice(0,consumed);this.position-=consumed;if(output.length){const pcm=new Int16Array(output);this.port.postMessage(pcm.buffer,[pcm.buffer]);}return true;}
}
registerProcessor('travel-pcm',TravelPCM);
