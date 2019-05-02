#line 1 "C:/Users/asus/Documents/MyProject.c"



sbit LCD_RS at RB4_bit;
sbit LCD_EN at RB5_bit;
sbit LCD_D7 at RB3_bit;
sbit LCD_D6 at RB2_bit;
sbit LCD_D5 at RB1_bit;
sbit LCD_D4 at RB0_bit;


sbit LCD_RS_Direction at TRISB4_bit;
sbit LCD_EN_Direction at TRISB5_bit;
sbit LCD_D7_Direction at TRISB3_bit;
sbit LCD_D6_Direction at TRISB2_bit;
sbit LCD_D5_Direction at TRISB1_bit;
sbit LCD_D4_Direction at TRISB0_bit;

unsigned int i = 0;

void main() {
 TRISA2_bit = 0;
 TRISA1_bit = 0;
 ADCON1 = 0x07;

 Lcd_Init();
 Lcd_Cmd(_LCD_CLEAR);
 Lcd_Cmd(_LCD_CURSOR_OFF);
 Lcd_Cmd(_LCD_FIRST_ROW);
 Lcd_Out_Cp("CSE 331 PROJECT");
 Lcd_Cmd(_LCD_SECOND_ROW);
 Lcd_Out_Cp("VISITOR: ");
 Lcd_Chr(2,10,48);
 Lcd_Chr(2,11,48);
 Lcd_Chr(2,12,48);
 while(1){
 if(PORTA.RA1==1&&PORTA.RA2==0){
 while(PORTA.RA2==0);
 i++;
 Lcd_Chr(2,10,(i/100)+48);
 Lcd_Chr(2,11,((i%100)/10)+48);
 Lcd_Chr(2,12,((i%100)%10)+48);
 while(PORTA.RA2==1);
 }

 if(PORTA.RA2==1&&PORTA.RA1==0&&i>=0){
 if(i>=0){
 while(PORTA.RA1==0);
 i--;
 Lcd_Chr(2,10,(i/100)+48);
 Lcd_Chr(2,11,((i%100)/10)+48);
 Lcd_Chr(2,12,((i%100)%10)+48);
 while(PORTA.RA1==1);
 }
 }
 }
}
