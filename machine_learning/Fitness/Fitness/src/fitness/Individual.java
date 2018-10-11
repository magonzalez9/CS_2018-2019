/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fitness;

/**
 *
 * @author Marco
 */
public class Individual implements Evaluable, Comparable<Individual> {

    int fitness;
    byte[] dna;
    int runningSum; 

    public Individual() {
        dna = new byte[L];
        init();
    }

    void init() {
        for (int i = 0; i < L; i++) {
            dna[i] = (byte) (Util.rand(2) & 0xFF);
        }
        //Environment.setState(Environment.Mu.countOnes);
        fitness = Environment.eval(this);       // so it has a fitness to start off
    }

    @Override
    public String toString() {
        return "Ind: " + Environment.printFitnessFunctionName()
                + " fitness=" + fitness + ", dna=" + format(dna);
    }

//    public static void main(String[] args) {    // trying to get a handle on how well enumberation would do...
//        Environment.setState(Environment.Mu.rr);        // set the fitness function
//
//        Individual anInd = null;
//        Individual best = new Individual();
//        for (long i = 0; i < 1000000000; i++) {
//            if (i % 1000000 == 0) {                 // every million tries, print a .
//                System.out.print(".");
//                System.out.println("Runtime.getRuntime().totalMemory() = " + Runtime.getRuntime().totalMemory());
//                System.out.println("Runtime.getRuntime().freeMemory() = " + Runtime.getRuntime().freeMemory());
//
//            }
//            if (best.getFitness() == 100) {         // see how long it takes to find all ones; this is simply true for the others
//                System.out.println("Victory!!");
//                break;
//            }
//            anInd = new Individual();               // create a random ind
//            if (anInd.getFitness() > best.getFitness()) {   // if it's better, remember it and report
//                best = anInd;
//                System.out.println("i=" + i + " best.getFitness() = " + best.toString());
//            }
//        }
//        System.out.println("done...");
//    }

    @Override
    public byte[] getDNA() {
        return dna;
    }

    @Override
    public int getFitness() {
        return fitness;
    }

    @Override
    public void setFitness(int fitness) {
        this.fitness = fitness;
    }

    @Override
    public Evaluable myClone() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int compareTo(Individual individual) {
        if (this.fitness == individual.fitness) {
            return 0;
        }
        if (this.fitness < individual.fitness) {
            return 1;
        }
        return -1;
    }

    private String format(byte[] dna) { // make the byte[] into a String
        String returnMe = "";

        for (byte nextByte : dna) {
            returnMe += nextByte;
        }

        return returnMe;
    }

//    public static void mainAgain(String[] args) {
//        Environment.setState(Environment.Mu.mystery);
//        for (int i = 0; i < 10; i++) {
//            Individual ind = new Individual();
//            System.out.println("ind = " + ind);
//        }
//
//    }

}
