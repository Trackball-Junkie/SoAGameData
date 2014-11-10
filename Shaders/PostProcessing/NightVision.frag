#version 130

uniform sampler2D unTexColor;
uniform sampler2D unTexNoise; 
uniform float unTime;
uniform float unLuminanceExponent;
uniform float unColorAmplification;
uniform vec3 unVisionColor;

in vec2 UV;

out vec4 pColor;

float lumMultiplier(float x) {
  x += abs(0.5 - x);
  float x2 = x * x;
  return 17.29 * x2 * x - 14.88 * x2 + 5.58 * x;
}

void main(){
  vec2 uv;
  uv.x = 0.4 * sin(unTime * 50.0);
  uv.y = 0.4 * cos(unTime * 50.0);
  
  float n = texture(unTexNoise, (UV * 3.5) + uv).r;
  vec3 c = texture(unTexColor, UV + (n * 0.001)).rgb;

  float lum = dot(vec3(0.30, 0.59, 0.11), c);
  c *= unColorAmplification * pow(lumMultiplier(lum), unLuminanceExponent + 4.0);

  vec3 visionColor = vec3(0.1, 0.95, 0.2);
  pColor = vec4((c + (n * 0.2)) * unVisionColor, 1.0);
}
