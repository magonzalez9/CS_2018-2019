/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dragrace;

/**
 *
 * @author Marco Gonzalez
 */
public class DragRace {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
//        RaceFrame r = new RaceFrame();
//        r.setVisible(true);

        int population = 10;
        int crossover = 1;
        int muRate = (int) (1 / .001);

        Environment.setState(Environment.Mu.countOnes);
        Population pList = new Population(population);

        pList.doageneration(muRate, crossover);
        System.out.println(pList.toString() + "\nFitness avg:" + pList.evaluateFitness());
        
        for(int i = 0; i < pList.getPopulationList().size(); i++){
            System.out.println("Speed: " + pList.getPopulationList().get(i).getSpeedStat());
            System.out.println("Acceleration: " + pList.getPopulationList().get(i).getAccStat());
            System.out.println("NOS: " + pList.getPopulationList().get(i).getNosStat()); 
            System.out.println(" ");
        }

        pList.doageneration(muRate, crossover);
        System.out.println(pList.toString() + "\nFitness avg:" + pList.evaluateFitness());
        System.out.println("NEW");
        for(int i = 0; i < pList.getPopulationList().size(); i++){
            System.out.println("Speed: " + pList.getPopulationList().get(i).getSpeedStat());
            System.out.println("Acceleration: " + pList.getPopulationList().get(i).getAccStat());
            System.out.println("NOS: " + pList.getPopulationList().get(i).getNosStat()); 
            System.out.println(" ");
        }


    }
}
